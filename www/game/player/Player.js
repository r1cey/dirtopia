import newGObj from '../newGameObj.js'
import newInvO from '../newInvObj.js'
import newDHold from '../newDictHolder.js'
import ShPlV from '../shared/player/PlVis.js'
import ShPl from '../shared/player/Player.js'
import Hands from './Hands.js'
import PCl from '../PeerCl.js'
import Loc from '../shared/Loc.js'

import PageInv from '../../PageInv.js'



const newPl	=( Base )=>class ClPl	extends newDHold(newGObj( Base ))
{
	pos	=new Loc()

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

	get srv()	{return this.game.srv }


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
		var pl	=this

		var newpos	=new Loc()

		var newloc	=new Loc()

		var dv	=this.dest.c().subv(this.pos)

		if( dv.zero() )
		{
			return false
		}
		else if(dv.disth() < 0.1 )
		{
			newpos.set(this.dest)
		}
		else
		{
			let mul	=0.22

			let map	=this.game.maps.gr

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

			newpos.set(this.pos).addv(dv.mul( mul ))
		}
		
		newloc.set( newpos ).roundh()

		if( ! this.loc.eq( newloc ) )
		{
			if( this.onmov( newloc ) )
			{
				this.pos.set( newpos )

				this.loc.set( newloc )
			}
		}
		else	this.pos.set( newpos )
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
	/** Is tile move acknowledged from server? */
	ismovack	=true

	static Vis	=PlVis


	constructor( ...args )
	{
		super( ...args )
/*
		var page	=this.newpinv()

		page.hide()

		this.game.html.el.appendChild( page.el )*/
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



Player.prototype. onmov	=function( newloc )
{
	if( this.ismovack )
	{
		this.ismovack	=false

		this.srv.send("mov", newloc )

		return true
	}
	return false
}



Player.prototype. rejmov	=function()
{
	this.dest.set( this.loc )	//TODO: fix this!

	this.ismovack	=true
}



Player.prototype. climb	=function( loc )
{
	this.srv().send.climb( this.loc.h ?false:true , this.loc )
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