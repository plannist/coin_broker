package com.coin.broker.util;

import java.io.Serializable;

public class Response<T> implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7929453301791600724L;
	
	public enum ResultCode{
		SUCCESS("S001"), FAIL("E001"),UPDATE("U001"),INSERT("I001");
		
		final private String code;
		
		ResultCode(String code) {
			this.code = code;
		}
		
		public String getCode() {
			return code;
		}
	}
	
	public enum DefaultMessage{
		성공적으로_저장하였습니다
		,저장에_실패하였습니다
		,취소신청_혹은_취소된_주문입니다
		;
		
		public static String getName(DefaultMessage msg) {
			return msg.name().replaceAll("_", " ").concat(".");
		}
	}
	
	private T data;
	private String statusMessage= ResultCode.FAIL.name();
	private String statusCode = ResultCode.FAIL.getCode();
	
	public Object getData() {
		return data;
	}
	
	public void setData(T data) {
		this.data = data;
		if(Utils.isNotEmpty(data)) {
			setStatusCode(ResultCode.SUCCESS.getCode());
			setStatusMessage(ResultCode.SUCCESS.name());
		}
	}
	
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
	
	public String getStatusCode() {
		return this.statusCode;
	}
	
	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}
	
	public String getStatusMessage() {
		return this.statusMessage;
	}
	
	public void settingResultCdMsg(String code, String msg) {
		this.statusCode = code;
		this.statusMessage = msg;
	}
	
	
}

