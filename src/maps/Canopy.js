import newShCnpy	from '../../www/shared/maps/newTreesMap.js'
import Map	from './Map.js'

import Loc from  '../../www/shared/Loc.js'
import V from  '../../www/shared/Vec.js'

import Gr	from './Ground.js'

import * as Trees from "./Trees.js"

import vegdefs	from '../../www/shared/maps/vegdefs.js'


///////////////////////////////////////////////////////////////////////////////


var ShCnpy	=newShCnpy(Map)

export default class Canopy extends ShCnpy
{
	static name	='trees'


	constructor( game, gr )
	{
		super( game )

		this.ground	=gr
	}
}


///////////////////////////////////////////////////////////////////////////////


/** Generates new canopy based on ground layer. */

Canopy.prototype. gen	=function( gr )
{
	this.ground	=gr

	this.build( gr._r, 0, new Loc( 0, 0, 1 ))

	this.gentrees()
}


/** Generates canopies based on set ground layer.
 * Assumes buffer is ready. */

Canopy.prototype. gentrees	=function()
{
	const gr	=this.ground

	const trees	=[]

	gr.fore(( loc)=>
	{
		const ic	=gr.ic( loc)

		const vegty	=gr.issoilplant_i( ic)

		if( vegty &&vegdefs[vegty].sz ==="tree" &&
			
			gr.getsoilvegstage_i( ic, vegty) >3 )
		{
			trees.push( loc.c( ))
		}

	})
	trees.sort(( loc1, loc2)=>
		
		gr.getsoilvegage( loc2) -gr.getsoilvegage( loc1))

	var age	=gr.getsoilvegage( trees[0])
	
	const minage	=gr.getsoilvegage( trees.at( -1))

	for(; age >minage ; --age)
	{
		for(var treeloc of trees)
		{
			this.growtree( treeloc)
		}
	}
}


/** @arg [ic]
 * @arg [lvl] */

Canopy.prototype. gentree	=function( loc, gr, ic, lvl )
{
	ic	??= this.ic(loc)

	lvl	??=gr.getveglvl_i( ic )

	var type	=gr.getvegty_i( ic )

	var brs	=[]

	for(var i =3; i <= lvl; i++ )
	{
		if( ! this.growtree( loc, type, brs, ic ))
		{
			break
		}
	}
}



/** Maybe it's worth it to reuse loc in all functions inside??
 * @arg [ic]
 * @return if grew or not */

Canopy.prototype. growtree	=function( loc, type, brs, ic )
{
	var m	=this

	type	??=this.ground.getvegty( loc )

	ic	??=m.ic(loc)
	{
		let t	=m.getfloorty_i( ic )
	
		if( t === "none" )
		{
			m.set_ic_("floorty", ic, loc, "trunk" )

			switch( type )
			{
				case "apple" :

					m.set_("newleaves", loc )
				break
				case "umbrtr" :

					m.set_("newleaves", loc, true )
			}

			return true
		}
		else if( t !== "trunk" )
		{
			return false
		}
	}
	return new Trees[type]( this, loc ).grow()
}


///////////////////////////////////////////////////////////////////////////////



Canopy.prototype. newbranch	=function( loc, brs, vbuf )
{
	var v	=vbuf

	var softdirs	=new Set([0,1,2,3,4,5])

	var dir

	for(var i=0; i<brs.length; i++ )
	{
		dir	=brs[i].dir

		if( m.isnextbr( v.set(loc).neighh(dir), dir ))	//this check is redundant
		{
			for(var j =-1 ; j <= 1; j++)
			{
				softdirs.delete( V.roth( dir, j ) )
			}
		}
	}

	dir	=-1

	for(var soft=1; soft >= 0 ; soft--)
	{
		if( (dir =scan([0,4,5],soft)) >= 0 )	break

		if( (dir =scan([1,3],soft)) >= 0 )	break

		if( (dir =scan([2],soft)) >= 0 )	break
	}

	if( dir >= 0 )
	{
		m.set_("branch", v.set(loc).neighh(dir), dir )

		brs.push( new Br(dir) )

		return true
	}
	else
	{
		return false
	}



	function scan( dirs, soft )
	{
		while( dirs.length )
		{
			var i	=rnd(dirs.length)

			if( (soft ?softdirs.has(dirs[i]) :1) &&
			
				m.getfloorty(v.set(loc).neighh(dirs[i])) === "none" )
			{
				return dirs[i]
			}

			dirs.splice(i, 1)
		}

		return -1
	}
}


/** Unneeded */

Canopy.prototype. closestbr	=function( loc, ploc )
{
	var map	=this

	var brloc	=new Loc()

	// using brloc to save on garbage collection
	var dir =V.dirv2dirh( brloc.set(ploc).subv(loc) )

	if( br(dir,0) )	return brloc

	for(var i=1; i<=2; i++)
	{
		if( br(dir,-i) )	return brloc
		if( br(dir,i) )	return brloc
	}
	if( br(dir,3) )	return brloc

	return



	function br( dir, rot )
	{
		dir	=V.roth(dir,rot)

		brloc.set(loc).neighh(dir)

		if( map.nextbranch( brloc, dir ))	return true
	}
}




///////////////////////////////////////////////////////////////////////////////



function rnd( n )
{
	return Math.floor(Math.random()*n )
}




function rnds( set, fun )
{
	var r

	while(set.length)
	{
		var i	=rnd(set.length)

		if( r =fun(set[i]) )	return r

		set.splice( i, 1 )
	}
}



function plusmin()
{
	return ( Math.round(Math.random()) << 1 ) - 1
}