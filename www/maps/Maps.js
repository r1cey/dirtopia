import ShMaps	from '../shared/maps/Maps.js'
import Map	from '../shared/maps/Map.js'
import Trees	from './Trees.js'
import Ground	from './Ground.js'

import Canvas from '../ui/canvas/Canvas.js'




export default class Maps extends ShMaps
{
	get cl()	{return this.game }



	static Ground	=Ground

	static Trees	=Trees



	/*constructor( cl )
	{
		super( cl )
	}*/



	sethonpllocs()
	{
		for(var pln in this.jsonlocs.pl )
		{
			var plloc	=this.jsonlocs.pl[pln]

			this.fore(( map )=>
			{
				if( map.obj.g( plloc )?.pl === pln )
				{
					map.loch( plloc )

					return true
				}
			})
		}
	}
}


///////////////////////////////////////////////////////////////////////////////

/*
M.prototype. onbuf	=function( buf )
{
	var id	=Map.codefrombuf( buf )

	var idmove	=id>>8		// when player moves, buffer id is received with offset

	if( idmove )
	{
		this.forbufid( idmove ,( map, ibuf )=>
		{
			map.shift( Loc.dirv2dirh(Loc.V.setj(o.delta)))
		})
	}
	else
	{
		this.forbufid( id, (map, ibuf)=>
		{
			map.setbuf( buf, ibuf )
		})
	}
}
*/




///////////////////////////////////////////////////////////////////////////////


/*
M.prototype. setbuf	=function( buf, code )
{
	code	??=Ground.codefrombuf( buf )

	var{ map, ibuf }	=this.frombid(code)

	map.setbuf( buf, ibuf )
}*/


///////////////////////////////////////////////////////////////////////////////



Maps.prototype. shift	=function( dir ,grbin ,grobj ,trbin ,trobj )
{
	this.gr.shift( dir, new Ground.MapShiftBo( grbin, grobj ) )

	this.tr.shift( dir, new Trees.MapShiftBo( trbin, trobj ) )
}