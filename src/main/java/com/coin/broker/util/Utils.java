package com.coin.broker.util;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.Map.Entry;

@Slf4j
public class Utils implements Cloneable{
	private static final String CONTENT_TYPE  = "CONTENT_TYPE";
	
	public static boolean isEmpty(Object obj) {
		if(obj == null) 														return true;
		if(obj instanceof String && String.valueOf(obj).trim().length() == 0) 	return true;
		if(obj instanceof Map) 													return ((Map<?, ?>)obj).isEmpty(); 
		if(obj instanceof List) 												return ((List<?>)obj).isEmpty();
		if(obj instanceof Object[]) 											return ((Object[])obj).length == 0;
		return false;
	}
	
	public static boolean isNotEmpty(Object obj) {
		return ! isEmpty(obj);
	}

	public static Object toCamelCase(JsonElement jsonElement, Object cls) {
		
		JsonObject obj = (JsonObject)jsonElement;
		Class<?> clazz = cls.getClass();
		log.debug("clzz: {}", clazz);
		List<Field> fields = Arrays.asList(clazz.getDeclaredFields());	
		
		for(Entry<String, JsonElement> data : obj.entrySet()) {
			String key = data.getKey();
			String value = String.valueOf(data.getValue()).replaceAll("\"", "");
			value = value.equals("null") ? null : value;
			for(Field var: fields) {
				var.setAccessible(true);
				if(key.toUpperCase().equals(var.getName().toUpperCase())) {
					try {
						var.set(cls, value);
					} catch (IllegalArgumentException | IllegalAccessException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return cls;

	}
	
	public static  <T> T voToVo (Object from, Class<T> to) {
		try {
            T newInstant = to.newInstance();
            Class<?> fromCls = from.getClass();
            Class<?> toCls   = newInstant.getClass();

			List<Field> fromFields = Arrays.asList(fromCls.getDeclaredFields());
			List<Field> toFields  = Arrays.asList(toCls.getDeclaredFields());


			for(Field f : fromFields) {
				f.setAccessible(true);
				String key = f.getName();
				//중요
                List<Object> values = new ArrayList<>();
                if(f.get(from) instanceof List){
                    values = (List) f.get(from);
                }
                String value = String.valueOf(f.get(from));
                value = value.equals("null") ? null : value;

//				log.debug("val: {}", value);
				for(Field t : toFields) {
					t.setAccessible(true);
					if(!t.getName().equals("serialVersionUID")) {
						if(key.toUpperCase().equals(t.getName().toUpperCase())) {
							log.debug("f.key == t.key");
							Class<?> type = t.getType();
                            log.debug("type: {}, value: {}", type, value);
							if(type.getTypeName().equals("java.lang.Integer") || type.getName().equals("int")) {
								Integer castVal = Integer.parseInt(value);
								t.set(newInstant, castVal);
							}else if(type.getTypeName().equals("java.lang.String")){
                                log.info("String value: {}", value);
								t.set(newInstant, value);
							}else if(value != null && type.getTypeName().equals("java.lang.Long")){

                                t.set(newInstant, Long.parseLong(value));
                            }else if(type.getTypeName().equals("java.util.List")){
                                t.set(newInstant, values);
                            }
							
						}
					}
				}
			}
            return newInstant;
		}catch(IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		return null;
	}
	
    public static HttpHeaders apiClientHttpHeader(String type) {
        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add(CONTENT_TYPE, type);

        return httpHeaders;
    }
    
/*    public static String getFullUrl(String detailUrl) {
    	StringBuffer buf = new StringBuffer();
    	return buf.append(BASE_URL).append("/").append(detailUrl).toString();
    }*/
    
    /**
     * @param
     * yyyy-MM-dd 형식 Date 검사
     * 
     * */
    public static boolean isDateHasHippen(String ... date) {
    	boolean flag = true;
    	List<String> list =Arrays.asList(date);
    	for(String element : list) {
    		if(isNotEmpty(element)){
	    		try {
	        		LocalDate.parse(element, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
	        	}catch(Exception e){
	        		flag = false;
	        		break;
	        	}
    		}
    	}
    	
    	return flag;
    }
    
    /**
     * @param
     * yyyyMMdd 형식 Date 검사
     * 
     * */
    public static boolean isDateNoHippen(String ... date) {
    	boolean flag = true;
    	List<String> list =Arrays.asList(date);
    	for(String element : list) {
    		if(isNotEmpty(element)){
    			try {
            		LocalDate.parse(element, DateTimeFormatter.ofPattern("yyyyMMdd"));
            	}catch(Exception e){
            		flag = false;
            		break;
            	}
    		}
    		
    	}
    	
    	return flag;
    }


    /**
	 * format return
	 * 0: year 	2022
	 * 1: month   02
	 * */
    public static String[] makeForAccountYearMonth(){
		YearMonth ym = YearMonth.from(LocalDate.now());
		int intMonth = ym.getMonthValue();
		//FIXME : 10 ==> payday 로 변경
		if(LocalDate.now().getDayOfMonth() < 10){
			ym = ym.minusMonths(1);
		}
    	return String.valueOf(ym).split("-");
	}
    
    /**
     * @return
     * ResponseBody return Data Json 형식으로 Set 
     * 
     * */
    public static ResponseEntity<String> makeResponsForJson(JsonObject result){
    	
    	HttpHeaders httpHeaders = new HttpHeaders();
    	httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
    	
    	Gson gson = new Gson();
    	String json = gson.toJson(result);
    	
    	return new ResponseEntity<>(json, httpHeaders, HttpStatus.OK);
    }
    
    
    
    
    public static <T> List<T> jsonArrayToListVo(JsonArray array, Class<T> clz) throws Exception{
    	List<Field> fields = Arrays.asList(clz.getDeclaredFields());
//    	for(Field f : fields) {
//    		log.debug("f name: {}", f.getName());
//    	}

    	List<T> list = new LinkedList<>();
    		
    	for(JsonElement el : array) {
    		T newInstant = clz.newInstance();
        	
    		JsonObject obj = (JsonObject)el;
    		for(Entry<String, JsonElement> entry : obj.entrySet()) {
    			String key = entry.getKey();
    			String value = entry.getValue().getAsString();
//    			log.info("key: {}, value: {}", key, value);
    			
    			for(Field var : fields) {
    				var.setAccessible(true);
    				if(var.getName().toUpperCase().equals(key.toUpperCase())) {
    					var.set(newInstant, value);
    				}
    			}
    		}

    		list.add(newInstant);
    	}
//    	log.info("list : {}", list);
    	return list;
    }

    public static <T>Object abc( Class<T> clz) throws IllegalAccessException, InstantiationException {
    	T newInstant = clz.newInstance();
		log.info("newInstant: {}", newInstant);
    	return newInstant;
	}
    
    public static <T> List <T> asList(Class<T> t, T vo){
    	List<T> list = new ArrayList<>();
    	list.add(vo);
    	return list;
    }
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
    	// TODO Auto-generated method stub
    	return super.clone();
    	
    }
    
   

}
