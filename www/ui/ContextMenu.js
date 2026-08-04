import Div from "./Div.js"
// import DivGo	from "./DivGameObj.js"

import V	from "../shared/Vec.js"


///////////////////////////////////////////////////////////////////////////////



class Option	extends Div
{
	optcfg



	constructor( menu ,optcfg )
	{
		super( menu ,"BUTTON" )

		Object.assign( this ,{ optcfg })

		const{ el }	=this

		el.textContent	=optcfg.str

		el.onclick	=menu.constructor.Opt.onclick.bind( this )

		menu.el.appendChild( el )
	}



	static onclick()
	{
		const{ optcfg }	=this

		const menu	=this.dad

		if( ! optcfg.test.call( menu ))
		{
			/** @todo recalculate all options */

			return 
		}
		const ui	=this.ui()

		ui.delctxm()

		optcfg.run.call( menu /*,ui.game*/ )
	}
}


///////////////////////////////////////////////////////////////////////////////



export default class CtxM	extends Div
{
	tgt

	pos	=new V()

	opts	=[]

	onoutclck	=this.#onoutclck. bind(this)


	static Opt	=Option

	/** [ { str ,test ,run(client) } ,... ] */

	static optcfgs	=[]


	/** Call setopts() in this derived class or manually */

	constructor( tgt ,pos )
	{
		const html	=tgt.html()

		super( html ,"ACTIONS" )

		this.tgt	=tgt

		this.pos.set( pos )

		this.setelpos()
	}


	static frompointev( dad ,pointev ,...args )
	{
		return new this( dad ,new V().setev( pointev ) ,...args )
	}

	
	///////////////////////////////////////////////////////////////////////////


	/** Simply goes through optcfgs in constructor and adds if test passe. */

	setopts()
	{
		// debugger

		const{ opts }	=this

		const Class	=this.constructor

		for(var optcfg of Class.optcfgs )
		{
			if( optcfg.test.call( this ))
			{
				this.addopt( optcfg )
			}
		}
	}


	///////////////////////////////////////////////////////////////////////////


	addopt( optcfg)
	{
		const Class	=this.constructor

		const opt	=new Class.Opt( this ,optcfg )

		this.opts.push( opt )
	}

	addopta( arr )	{ this.addopt( this.constructor.newoptcfg( ...arr ))}


	static newoptcfg( str ,test ,run )
	{
		return{ str ,test ,run }
	}

	///////////////////////////////////////////////////////////////////////////



	setelpos()
	{
		const style	=this.el.style

		const pos	=this.pos

		style.left	=`${Math.floor(pos.x)}px`
		style.top	=`${Math.floor(pos.y)}px`
	}



	#onoutclck( ev )
	{
		const ctxm	=this

		// console.log( "doc click!" )

		if( ! ctxm.el.contains( ev.target ) )
		{
			this.ui().delctxm()
		}
	}
}


///////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////