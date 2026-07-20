// import PageInv from "../../inv/PageInv.js"

import newPage	from "../../newPage.js"

import Hands	from "../../inv/Hands.js"

import newGrid	from "../../inv/newGrid.js"
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

		const inv	=pl.inv

		const belt	=pl.gitem( "belt" )

		if( belt )
		{
			const bel	=document.createElement( "belt" )

			this.belt	=new Grid( belt ,this ,bel )

			el.appendChild( bel )
		}
		var sbag	=pl.gitem( "seedbag" )

		if( sbag )
		{
			pl.foretp( "seedbag" ,( sbag )=>
			{
				const sbel	=document.createElement( "seedbag" )

				this.seedbags.push( new Grid( sbag ,this ,sbel ))

				el.appendChild( sbel )
			})
		}
	}


	///////////////////////////////////////////////////////////////////////////

	

}


///////////////////////////////////////////////////////////////////////////////



const Grid	=newGrid( DivGo )


///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////