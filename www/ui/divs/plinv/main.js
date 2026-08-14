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
		const div	=this.fore( div =>
		
			div.gobj === gobj	? div	:null
		)
		return div
	}


	delitem( item )
	{
		const gobjk	=item.gkey()

		if( gobjk === "belt" )
		{
			this.belt.del()

			this.belt	=null
		}
		else if( gobjk === "seedbag" )
		{
			const{ seedbags: sbags }	=this

			const i	=sbags.findIndex( sbdiv => sbdiv.gobj === item )

			if( i >= 0)
			{
				sbags[i].del()

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


	/** Iterates over every single divgo in this div including itself */

	fore( fun )
	{
		if( fun( this ))	return this

		if( fun( this.hands ))	return this.hands

		if( this.belt )
		{
			const res	=this.belt.fore( fun )

			if( res )	return res
		}
		for(var i=0;i< this.seedbags.length ;i++)
		{
			const res	=this.seedbags[i].fore( fun )

			if( res )	return res
		}
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