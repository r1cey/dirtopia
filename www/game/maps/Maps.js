import ShMaps	from '../shared/maps/Maps.js'
import Map	from '../shared/maps/Map.js'
import Trees	from './Trees.js'
import Ground	from './Ground.js'
import newGObj from '../newGameObj.js'

import Can from '../../canvas/Canvas.js'




export default class Maps extends newGObj( ShMaps )
{
	constructor( cl )
	{
		super( cl ,Ground ,Trees )
	}


	setcan()
	{
		this.html.can	=new Can( this )
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
			map.shift( Loc.dirv2dirh(Loc.V.seta(o.delta)))
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



Maps.prototype. shift	=function( grbin, grobj, trbin, trobj, dir )
{
	this.gr.shift( dir, new Ground.MapShiftBo( grbin, grobj ) )

	this.tr.shift( dir, new Trees.MapShiftBo( trbin, trobj ) )
}