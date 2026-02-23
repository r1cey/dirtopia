import HEl from "./HtmlEl.js"


export default class Grid	extends HEl
{
	gridos	=[]

	constructor( dad )
	{
		var gobj	=dad.gobj

		super( dad ,"grid" ,gobj )

		for(var invkey in gobj.inv )
		{
			var invo	=gobj.inv[invkey]

			if( invo.isstck )	this.add( invo )

			else
			{
				for(var id in invo)	this.add( invo[id] )
			}
		}
	}


	add( grido )
	{
		this.gridos.push( { area :grido.calcarea() ,o :grido })
	}


	sort()
	{
		this.gridos.sort(( a ,b )=>
		{
			b.area - a.area
		})
	}
}