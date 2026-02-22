import Page from "./Page.js"


export default class PageInv	extends Page
{
	constructor( html ,gobj )
	{
		var key	=gobj.constructor.key

		super( html ,key ,gobj )
	}
}