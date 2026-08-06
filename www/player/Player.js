// import newInvO from '../newInvObj.js'
// import newISlot from '../items/newInvSlot.js'
// import newDHold from '../newDictHolder.js'
import ShPlV from '../shared/player/PlVis.js'
import ShPl from '../shared/player/Player.js'
import Hands from './Hands.js'
import PCl from '../PeerCl.js'
import Loc from '../shared/Loc.js'

import PageInv from '../ui/inv/PageInv.js'



const scrloc	=new Loc()



const newPl	=( Base )=>class ClPl	extends /*newISlot(newDHold(*/ Base //))
{
	/** The exact visual fractional position */
	pos	=new Loc()

	/** The cell the player is going to visually */
	dest	=new Loc()


	static Hands	=Hands


	///////////////////////////////////////////////////////////////////////////


/*
	constructor( cl )
	{
		super( cl )

		delete this.pls
	}
*/

	///////////////////////////////////////////////////////////////////////////



	// get pls()	{return this.dad }

	// set pls( pls )	{ this.dad	=pls	}

	gsrv()	{return this.ggame().srv }


	///////////////////////////////////////////////////////////////////////////
	

	/** Shift pos.
	 * @todo Atm only applicable on client player */

	step( dt )
	{
		const pl	=this

		const{ pos ,dest }	=pl

		if( pos.eq( dest ))	return

		const dv	=scrloc.s(dest).subv(pos)

		if(dv.disth() < 0.1 )
		{
			pos.set( dest )
		}
		else
		{
			let mul	=0.22

			const map	=this.gmap()

			if( map.isgr )
			{
				switch( map.getwaterlvl( pl.loc ) )
				{
					case 1:
						mul	=0.17
					break;
					case 2:
					case 3:
						mul	=0.08
				}
				if( pl.water <= 0 )	mul=0.08
			}
			pos.addv(dv.mul( mul ))
		}
		/*const newloc	=this.scrloc.set( pos ).roundh()

		if( ! this.visloc.eq( newloc ))
		{
			this.onmov( newloc )

			this.visloc.set( newloc )
		}*/	
	}


	onmov()	{return true }


	newpinv( dadui )
	{
		var pinv	=super.newpinv( dadui)

		pinv.grid.add( this.hands )

		pinv.grid.fill()

		return pinv
	}



	setj( msg )
	{
		super.setj( msg )

		this.dest.set( this.loc )

		this.pos.set( this.loc )

		// this.visloc.set( this.loc )

		return this
	}
}



class PlVis extends newPl( ShPlV )
{
	rcl


	onmov( newloc )
	{
		if( ! this.game.pl.sees( newloc ))
		{
			delete this.game.vispls[this.name]
		}
		
		return true

		/*var clpl	=this.lcl.pl

		if( ! (clpl.sees(this.loc) || clpl.sees(this.dest)) )
		{
			delete this.lcl.vispls[this.name]
		}*/
	}

	newcl()
	{
		this.rcl	=new PCl(this)
	}
}


const PlBase	=newPl( ShPl )

export default class Player extends PlBase
{
	srvloc	=this.loc

	movbuf	=
	{
		max	:5
		,
		a	:[]
	}
	/** Is used when server moves the player */
	isforcemov	=false

	
	get isclpl()	{return true }

	static Vis	=PlVis

	/*static
	{
		this.dupacts()

		this.acts.mov[0]	=function( nav ,pl ,dest )
		{
			return	
		}
	}*/


	/*constructor( ...args )
	{
		super( ...args )
	}*/



	/*canmov( dest ,map )
	{
		const pl	=this

		const{ visloc }	=pl

		return	visloc.eq( dest ) ||

				pl.movbuf.a.at(-1).eq( dest ) ||
				
				super.canmov( dest ,map )
	}*/

	/** User dragged player to new cell
	 * @arg destv {Vec} */

	vismov( destv )
	{
		if( ! this.canmov( destv ))	return

		const{ movbuf }	=this

		if( movbuf.a.length >= movbuf.max )	return

		this.gsrv().send( "mov" ,destv )

		const dest	=this.dest.setv( destv )

		movbuf.a.push( dest.clone() )
	}


	/** @todo Consider cancelling canvas drag when forcefully moving. */

	forcemov( dest )
	{
		this.mov( dest )
		
		this.isforcemov	=true

		this.dest.set( dest )
	}


	/** Whenever player moves cell on screen. *

	onmov( dest )
	{
		if( this.isforcemov )
		{
			if( dest.eq( this.loc ))
			{
				this.isforcemov	=false
			}
		}
		else
		{
			this.gsrv().send( "mov" ,dest )
		}
	}*/



	/*setj( msg )
	{
		super.setj( msg )

		this.srvloc.set( this.loc )

		return this
	}*/
}


///////////////////////////////////////////////////////////////////////////////


/*
Player.prototype. lcl_acto	=function( path ,actk ,args )
{
	var{ lcl }	=this

	var obj	=lcl.pmsg2obj( path )

	// if( ! obj )	

	lcl.srv.send("actobj", path, actk, args )
}*/


///////////////////////////////////////////////////////////////////////////////



Player.prototype. climb	=function( loc )
{
	this.gsrv().send.climb( this.loc.h ?false:true , this.loc )
/*
	var pl	=this

	var{ tr }	=this.lcl.maps

	var loc2	=tr.findclosestbr( loc )*/
}

/*Player.prototype. moved	=function( dir )
{
	var pl	=this

	var loc	=pl.loc
	
	var vispls, name, pl2
	
	pl.lcl.srv.s.mov( loc )

	vispls	=pl.lcl.vispls
	
	for(name in vispls)
	{
		pl2	=vispls[name]

		if( ! pl.sees( pl2.loc ))
		{
			delete vispls[pl2.name]
		}
	}
}*/