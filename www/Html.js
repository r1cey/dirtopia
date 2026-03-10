import Ui from './UIElement.js'
import Con from './Console.js'
import Can from './canvas/Canvas.js'
import Menu	from "./Menu.js"
// import ContextMenu	from "./ContextMenu.js"
import Imgs	from "./Imgs.js"


export var imgdir	="/imgs/"

export default class Html	extends Ui
{
	get cl()	{return this.gobj }

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

	get can()	{return this.gobj.maps.ui.can }

	menu	=new Menu(this)

	ps	={}

	uis	=new WeakMap()

	ctxmenu

	imgs	=new Imgs(this)

	resize	=
	{
		tout	:0
		,
		delay	:100
	}



	constructor( cl )
	{
		super( document.querySelector("screen") ,cl )

		window.onresize	=this.onresize. bind(this)
	}


	////////////////////////////////////////////////////////////////////////////



	async loadel( name ,gobj )
	{
		return	this.ps[name]	=await super.loadel( name ,gobj )
	}


	delpage( name )
	{
		if( this.ps[name] )
		{
			this.ps[name].el?.remove()
			this.ps[name].css?.remove()
			delete this.ps[name]
		}
	}


	/** Run this for UI elements with a game object attached to it
	 * so we can do reverse lookup from HTML element to game object;
	 * for example when dragging and dropping. */

	addui( ui )
	{
		this.uis.set( ui.el ,ui.gobj )

		return ui
	}



	newplinv( pl )
	{
		return this.newpinv( pl ,false )
	}



	newpinv( dholder ,show =true )
	{
		var p	=dholder.newpinv()

		this.el.appendChild( p.el )

		return p
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
	var res	=this.resize

	if( res.tout )	clearTimeout( res.tout )
	
	res.tout	=setTimeout(()=>
		{
			this.can?.resize()
		},
		res.delay
	)
}