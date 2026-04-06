import UiGo from './UIGameObj.js'
import Con from './Console.js'
import Can from './canvas/Canvas.js'
import Menu	from "./Menu.js"
// import ContextMenu	from "./ContextMenu.js"
import Imgs	from "./Imgs.js"


export var imgdir	="/imgs/"


/** Root HTML class. */

export default class Html	extends UiGo
{
	get cl()	{return this.gobj }

	uis	=new WeakMap()

	con	=new Con(this, document.querySelector('console'))

	fps	=
	{
		el	:document.querySelector('fps')
		,
		set	:function( n )
		{
			this.el.textContent	=`${n}fps`
		}
	}
	can	=new Can( this )	//addui

	menu	=new Menu(this)

	ps	=
	{
		plinv	:null
		,
		inv	:null
	}
	ctxmenu

	imgs	=new Imgs(this)

	resize	=
	{
		tout	:0
		,
		delay	:100
	}

	static ishtml	=true


	///////////////////////////////////////////////////////////////////////////



	constructor( cl )
	{
		super( cl ,null ,document.querySelector("screen") )

		window.onresize	=this.onresize. bind(this)
	}


	////////////////////////////////////////////////////////////////////////////


	
	html()	{return this }


	///////////////////////////////////////////////////////////////////////////



	async loadel( name ,gobj )
	{
		return	this.ps[name]	=await super.loadel( name ,gobj )	//addui
	}


	delpage( name )
	{
		const ui	=this.ps[name]

		if( ui )
		{
			this.uis.delete( ui.el )

			ui.el?.remove()
			ui.css?.remove()
			delete this.ps[name]
		}
	}



	async newplinv( pl )
	{
		return this.loadel( "plinv" ,pl )
	}



	newpinv( dholder ,isclpl )
	{
		var p	=dholder.newpinv( this )

		this.addui( p )

		this.ps[ isclpl ? "plinv" : "inv" ]	=p

		this.el.appendChild( p.el )

		return p
	}


	/** Run this for UI elements with a game object attached to it
	 * so we can do reverse lookup from HTML element to game object;
	 * for example when dragging and dropping. */

	addui( ui )
	{
		return this.addel2ui( ui.el ,ui )
	}

	/** Some child elements should reference parent ui to not be confused.
	 * Maybe change later? */

	addel2ui( el ,ui )
	{
		this.uis.set( el ,ui )

		return ui
	}



	newctxm( gobj ,ev )
	{
		if( this.ctxmenu )	this.delctxm()
			
		var ctxm	=this.ctxmenu	=gobj.newctxm( ev )

		ev.stopPropagation()

		setTimeout( ()=>{ document.addEventListener('click', this.touchout )}, 0 )
		
		this.el.appendChild( ctxm.el )

		return ctxm
	}


	///////////////////////////////////////////////////////////////////////////



	delctxm()
	{
		document.removeEventListener( "click" ,this.#touchout )

		this.ctxmenu.el.remove()

		this.ctxmenu	=null
	}


	///////////////////////////////////////////////////////////////////////////



	#touchout( ev )
	{
		if( ! this.ctxmenu.el.contains( ev.target ))
		{
			this.delctxm()
		}
	}
	touchout	=this.#touchout.bind(this)
}


///////////////////////////////////////////////////////////////////////////////


/*
Html.prototype. loadp	=async function( name, dad ,...args )
{
	dad	??=this

	var promis	=[,,]

	promis[0]	=this.fetch(`pages/${name}/main.xhtml`)

	promis[1]	=import(`./pages/${name}/main.js?${Math.floor(Math.random()*100)}`)

	promis[2]	=new Promise(function(res, rej)
	{
		let el	=document.createElement( 'link' )

		el.type	='text/css'
		el.rel	='stylesheet'
		el.onload	=(ev)=> res(el)
		el.onerror	=(ev)=> rej(el)
		el.href	=`pages/${name}/main.css?${Math.floor(Math.random()*100)}`

		document.head.appendChild(el)
	})

	var res	=await Promise.allSettled( promis )

	var el, css, p

	if( res[0].status === 'rejected' )
	{
		console.log(`Failed to load xhtml: ${name}/main.xhtml`)
	}
	else
	{
		el	=(new DOMParser()).parseFromString(await res[0].value.text(), "text/html").body.firstElementChild
	}
	if( res[2].status === 'rejected' )
	{
		console.log(`Failed to load css: ${name}/main.css`)

		res[2].value.remove()
	}
	else
	{
		css	=res[2].value
	}
	if( res[1].status === 'rejected' )
	{
		p	={ el, css }
	}
	else
	{
		p	=new (res[1].value.default)(dad, el, css, ...args)
	}

	this.ps[name]	=p

	return p
}*/


///////////////////////////////////////////////////////////////////////////////



Html.prototype. objchanged	=function( loc, key )
{
	var menu	=this.can.ctxmenu

	if( ! menu )	return

	if( menu.loc.eq(loc) )	menu.del()
}


///////////////////////////////////////////////////////////////////////////////



Html.prototype. onresize	=function()
{
	const res	=this.resize

	if( res.tout )	clearTimeout( res.tout )
	
	res.tout	=setTimeout(()=>
		{
			this.can?.resize()
		},
		res.delay
	)
}