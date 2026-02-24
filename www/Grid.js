import HEl from "./HtmlEl.js"


export default class Grid	extends HEl
{
	gridels	=[]



	constructor( dad ,dictholder )
	{
		// var gobj	=dad.gobj

		super( dad ,"grid" ,dictholder )

		dictholder.fore(( item )=>
		{
			this.add( item )
		})
		this.sort()

		for(var gridel of this.gridels )
		{
			this.el.appendChild( gridel.el )
		}
	}


	add( grido )
	{
		this.gridels.push( grido.newelinv( this.dad ))
	}



	sort()
	{
		this.gridels.sort(( a ,b )=> b.area - a.area )
	}
}