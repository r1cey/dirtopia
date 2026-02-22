import HEl from "./HtmlEl.js"


export default class HtmlInv	extends HEl
{
	gridel


	constructor( dad ,el ,gobj ,css )
	{
		super( dad ,el ,gobj ,css )

		this.gridel	=el.querySelector( "grid" )

		var insize	=0

		for(var key in gobj.inv )
		{
			var invo	=gobj.inv[key]

			if( invo.isstck )	insize	+= invo.constructor.gridarea()

			else
			{
				for(var id in invo )
				{
					insize	+= invo[id].gridarea()
				}
			}
		}
		var size	=gobj.constructor.size

		if( size )
		{
			let insize	=0

			for(var key in gobj.inv )

			el.style.gridArea	=`span ${size[1]}/span ${size[0]}`
		}
	}


	async loadel( name, gobj )
	{
		var hel	=await super.loadel( name ,gobj ,false )

		this.gridel.appendChild( hel.el )

		return hel
	}
}