/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	config.extraPlugins = 'autogrow';
	config.autoGrow_minHeight = 200;
	config.autoGrow_maxHeight = 250;
	config.width = '100%';
	config.height = 200;

	config.toolbar = [
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo' ] },
		
		{ name: 'editing', items: [ 'Scayt' ] },
		
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Smiley'] },
		
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 
									'JustifyLeft', 'JustifyCenter', 'JustifyBlock'] },
		
		{ name: 'links', items: [ 'Link', 'Unlink'] },		
		
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] }
	];

};
