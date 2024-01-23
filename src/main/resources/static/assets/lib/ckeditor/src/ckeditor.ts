/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		BlockQuote,
		Bold,
		Essentials,
		Indent,
		Italic,
		Link,
		Paragraph,
		TextTransformation,
		Undo
	];

	public static override defaultConfig: EditorConfig = {
		toolbar: {
			items: [
				'bold',
				'italic',
				'link',
				'|',
				'outdent',
				'indent',
				'|',
				'blockQuote',
				'undo',
				'redo'
			]
		},
		language: 'ko'
	};
}

export default Editor;
