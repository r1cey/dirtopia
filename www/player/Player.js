// import newInvO from '../newInvObj.js'
// import newISlot from '../items/newInvSlot.js'
// import newDHold from '../newDictHolder.js'
import ShPlV from '../shared/player/PlVis.js'
import ShPl from '../shared/player/Player.js'
import Hands from './Hands.js'
import PCl from '../PeerCl.js'
import Loc from '../shared/Loc.js'

import PageInv from '../ui/inv/PageInv.js'



const newPl	=( Base )=>class ClPl	extends /*newISlot(newDHold(*/ Base //))
{
	/** The exact, fractional position */
	pos	=new Loc()

	/** can never be something forbidden */
	dest	=new Loc()

	/** Scratch vector (to save on garbage collection) */
	scrloc	=new Loc()

	scrloc2	=new Loc()


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



	setj( msg )
	{
		super.setj( msg )

		this.dest.set( this.loc )

		this.pos.set( this.loc )

		return this
	}
	
	/*setloc()
	{
		this.loc.set(this.dest).roundh()
	}*/


	step( dt )
	{
		const pl	=this

		const{ pos ,dest }	=pl

		const dv	=this.scrloc.s(dest).subv(pos)

		if( dv.zero() )
		{
			return false
		}
		// const newpos	=new Loc() 

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
		const newloc	=this.scrloc.set( pos ).roundh()

		if( ! this.loc.eq( newloc ))
		{
			this.onmov( newloc )
		}	
		this.loc.set( newloc )
	}


	onmov()	{return true }


	newpinv( dadui )
	{
		var pinv	=super.newpinv( dadui)

		pinv.grid.add( this.hands )

		pinv.grid.fill()

		return pinv
	}


	/*static fromJSON( val ,pls )
	{
		const pl	=super.fromJSON( val ,pls )

		pl.hands.pl	=pl

		return pl
	}*/
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



export default class Player extends newPl( ShPl )
{
	srvloc	=new Loc()

	/** Is used when server moves the player */
	isforcemov	=false

	
	get isclpl()	{return true }

	static Vis	=PlVis


	/*constructor( ...args )
	{
		super( ...args )
	}*/


	/** Forcefully moves player to a new location.
	 * Assume location already updated by server.
	 * @todo Consider cancelling canvas drag when forcefully moving. */

	mov( dest )
	{
		this.isforcemov	=true

		this.dest.set( dest )
	}


	setj( msg )
	{
		super.setj( msg )

		this.srvloc.set( this.loc )

		return this
	}
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



Player.prototype. onmov	=function( dest )
{
	if( this.isforcemov )
	{
		if( dest.eq( this.srvloc ))
		{
			this.isforcemov	=false
		}
	}
	else	this.gsrv().senda( this.nav ,"mov", dest )
}



Player.prototype. rejmov	=function()
{
	this.dest.set( this.prevloc )

	this.ismovack	=true
}



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