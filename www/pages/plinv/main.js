import HInv from "../../HtmlInv.js"
import V from "../../game/shared/Vec.js"



export default class Inv extends HInv
{
	hands

	belt

	seedbags	=[]

	cl()	{return this.html().cl }

/*
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
	}*/
	hidebound	=this.hide.bind(this)


	constructor( html, el, pl, css )
	{
		super( html, el, pl ,css )

		this.hands	=pl.hands.newhinv( this )

		for(var id in pl.inv.belt )
		{
			pl.inv.belt[id].loadhinv( this ).then(( hinv )=>
			{
				this.belt	=hinv

				hinv.show()
			})
			break;
		}/*
		for(var id in pl.inv.seedbag )
		{
			pl.inv.seedbag[id].newhinv( this )
		}*/
	}


	///////////////////////////////////////////////////////////////////////////

	

	show()
	{
		// Load those containers whose contents are not obvious to the player

		if( this.belt )
		{
			// this.belt.load()
		}
		for(var sb of this.seedbags )
		{
			sb.load()
		}
		// this.dadel.appendChild( this.el )

		super.show()

		this.html().can.el.addEventListener("click", this.hidebound,{ once :true})

		/*console.log("B")

		this.html().can.el.addEventListener("click", ()=>
			{
				this.hide()

				console.log("A")
			},{ once :true})*/
	}
}


///////////////////////////////////////////////////////////////////////////////




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


/*
class Hands	extends HCnt
{


	constructor( inv, ghands )
	{
		super( inv, inv.el.getElementsByTagName("hands")[0], null, ghands )

		this.update()
	}


	update()
	{
		var item	=this.gcnt.item

		var itemel	=this.el.getElementsByTagName("ITEM")?.[0]

		if( item )
		{
			if( ! itemel )
			{
				itemel	=document.createElement( "ITEM" )

				this.el.appendChild( itemel )
			}
			var itemk	=item.constructor.key

			itemel.className	=itemk

			if( item.isstck )	itemel.textContent	=item.len

			// el.onclick	=( ev )=>
		}
		else if( itemel )
		{
			this.el.removeChild( itemel )
		}
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
}*/