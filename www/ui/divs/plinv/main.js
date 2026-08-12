// import PageInv from "../../inv/PageInv.js"

import newPage	from "../../newPage.js"

import Hands	from "./Hands.js"

import newGrid	from "../../inv/newGridCnt.js"
import DivGo	from "../../DivGameObj.js"

import V from "../../../shared/Vec.js"



export default class PlInv extends newPage( 1 )
{
	hands

	belt

	seedbags	=[]



	constructor( pl, html ,el ,css )
	{
		// debugger;

		super( pl ,html ,el ,css )  

		this.hands	=new Hands( pl.hands ,this )

		pl.fore( item => this.additem( item ))

		/*const inv	=pl.inv

		const belt	=pl.gitem( "belt" )

		if( belt )	this.addbelt( belt )

		pl.foretp( "seedbag" ,sbag => this.addsbag( sbag ))*/
	}


	///////////////////////////////////////////////////////////////////////////

	
	go2div( gobj )
	{
		const div	=this

		if( gobj === div.gobj )	return div

		const gobjk	=gobj.gkey()

		if( gobjk === "hands" )	return div.hands

		if( gobjk === "belt" )	return div.belt

		if( gobjk === "seedbag" )
		{
			const sbdiv	=div.seedbags.find( sbdiv => sbdiv.getgo() === gobj )

			if( sbdiv )	return sbdiv

			else	console.error( "PlInv.go2div: no div for sbag" ,gobj )
		}
		console.error( "PlInv.go2div: no div for gobj" ,gobj )
	}


	delitem( item )
	{
		const gobjk	=item.gkey()

		if( gobjk === "belt" )
		{
			this.belt	=null

			this.el.removeChild( this.belt.el )
		}
		else if( gobjk === "seedbag" )
		{
			const{ seedbags: sbags }	=this

			const i	=sbags.findIndex( sbdiv => sbdiv.getgo() === item )

			if( i >= 0)
			{
				this.el.removeChild( sbags[i].el )

				sbags.splice( i ,1 )
			}
			else	console.error( "PlInv.delitem: no div for sbag" ,item )
		}
		else	console.error( "PlInv.delitem: no div for gobj" ,item )
	}


	additem( item )
	{
		const gobjk	=item.gkey()

		if( gobjk === "belt" )	this.addbelt( item )

		else if( gobjk === "seedbag" )
		{
			this.addsbag( item )
		}
		else	console.error( "PlInv.additem" ,item )
	}


	///////////////////////////////////////////////////////////////////////////


	addbelt( belt )
	{
		const bel	=document.createElement( "belt" )

		this.belt	=new Grid( belt ,this ,bel )

		// bel.classList.add( "root" )

		this.hands.el.after( bel )
	}


	addsbag( sbag )
	{
		const sbel	=document.createElement( "seedbag" )

		this.seedbags.push( new Grid( sbag ,this ,sbel ))

		// sbel.classList.add( "root" )

		this.el.appendChild( sbel )
	}
}





const Grid	=newGrid( DivGo )


///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////