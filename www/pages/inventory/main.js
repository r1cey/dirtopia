import P from '../Page.js'
import V from "../../game/shared/Vec.js"

import HCnt from '../Cnt.js'



export default class Inv extends P
{
	pl

	dadel

	hands

	belt

	seedbags	=[]

	cl()	{return this.html.cl }


	hide()
	{
		this.belt.hide()

		for(var seedbag of this.seedbags )
		{
			seedbag.hide()
		}
		try
		{
			this.dadel.removeChild( this.el )
		}
		catch(err) {}

		this.html.can.el.removeEventListener( "click", this.hidebound )
	}
	hidebound	=this.hide.bind(this)


	constructor( html, el, css, pl )
	{
		super( html, el, css )

		this.pl	=pl

		pl.html.inv	=this
		
		this.dadel	=this.html.screen

		this.hands	=new Hands(this, pl.hands )

		// pl.attachhtmlinv( this )

		for(var id in pl.inv.belt )
		{
			this.belt	=new HCnt(this, pl.inv.belt[id] )

			el.appendChild( this.belt.el )
		}
	}
}


///////////////////////////////////////////////////////////////////////////////



Inv.prototype. show	=function()
{
	// Load those containers whose contents are not obvious to the player

	if( this.belt )
	{
		this.belt.load()
	}
	for(var sb of this.seedbags )
	{
		sb.load()
	}
	this.dadel.appendChild( this.el )

	this.html.can.el.addEventListener("click", this.hidebound,{ once :true})
}


///////////////////////////////////////////////////////////////////////////////



Inv.prototype. addbelt	=function( plbox )
{
	this.belt	=new Belt(this, plbox )

	return this.belt
}



Inv.prototype. addseedbag	=function( plbox )
{
	var sb	=new Seedbag(this, plbox )

	this.seedbag.push(sb)

	return sb
}


///////////////////////////////////////////////////////////////////////////////



class HtmlCnt
{
	inv

	el

	gcnt


	additem( itemn, item, num )	{}


	constructor( inv, el, gcnt )
	{
		this.inv	=inv

		this.el	=el

		this.gcnt	=gcnt

		gcnt.html.inv	=this
	}



	show()
	{

	}


	hide()
	{
		for(var itemel of this.el.getElementsByTagName("ITEM") )
		{
			this.el.removeChild( itemel )
		}
	}

	/** @return num */

	additem( itemn, num )
	{
		var el	=document.createElement( "ITEM" )

		el.className	=itemn

		el.textContent	=num

		el.onclick	=( ev )=>
		{
			let acts	=this.inv.html.contextmenu.newev( ev )

			acts.addopt( "Use All", ()=>
			{
				let pl	=this.inv.pl

				let from	=this.gcnt

				let to	=pl.hands
				
				from !== to ? pl.movitem( from , itemn, num, to ) : 0

				this.inv.hide()
			})
			acts.show()
		}
		this.el.appendChild( el )

		return num
	}


	delitem( item, len =1 )
	{
		var el	=this.el.querySelector("."+item.gkey())

		if( item.isstck )
		{
			var rem	=parseInt(el.textContent) - len

			rem > 0	? el.textContent =rem	: this.el.removeChild( el )
		}
		else	this.el.removeChild( el )
	}
}


///////////////////////////////////////////////////////////////////////////////



class Hands	extends HtmlCnt
{
	constructor( inv, plhands )
	{
		super( inv, inv.el.getElementsByTagName("hands")[0], plhands )

		if( plhands.item )	this.setitem( plhands.item )
	}


	setitem( item )
	{
		var itemk	=item.constructor.key

		var el	=document.createElement( "ITEM" )

		el.className	=itemk

		if( item.isstck )	el.textContent	=item.len

		// el.onclick	=( ev )=>
			
		this.el.appendChild( el )
	}


	show()
	{
		this.setitem( this.gcnt.item )
	}
}


///////////////////////////////////////////////////////////////////////////////



class Belt	extends HtmlCnt
{
	get gbelt()	{return this.gcnt }


	constructor( inv, plbelt )
	{
		// super( inv, inv.el.getElementsByTagName("BELT")[0], plbox )

		super( inv, document.createElement( "BELT" ) ,plbelt )
	}


	load()
	{
		if( this.gbelt.inv.multi )
		{
			
		}
		this.gcnt
	}
}


///////////////////////////////////////////////////////////////////////////////



class Seedbag	extends HtmlCnt
{
	constructor( inv, plsb )
	{
		super( inv, document.createElement( "SEEDBAG" ) ,plsb )
	}
}