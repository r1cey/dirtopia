import DivGo from './DivGameObj.js'
// import Con from '../../Console.js'
import Can from './canvas/Canvas.js'
// import Menu	from "../../Menu.js"
// import ContextMenu	from "./ContextMenu.js"
// import Imgs	from "../../Imgs.js"


export var imgdir	="/imgs/"



export default class Html	extends DivGo
{
	game	=this.gobj

	ui

	divs	=new WeakMap()

	can	=this.adddiv( new Can( this.game.maps ,this ,document.getElementById("can") ))

	// con	=new Con(this, document.querySelector('console'))

	fps	=
	{
		el	:document.querySelector('fps')
		,
		set	:function( n )
		{
			this.el.textContent	=`${n}fps`
		}
	}
	// menu	=new Menu(this)

	// ctxmenu

	// imgs	=new Imgs(this)

	login

	// static ishtml	=true


	///////////////////////////////////////////////////////////////////////////



	constructor( game ,ui )
	{
		super( game ,null ,document.querySelector( "screen" ))

		this.ui	=ui
	}


	////////////////////////////////////////////////////////////////////////////


	
	html()	{return this }


	///////////////////////////////////////////////////////////////////////////



	/*async loadel( name ,...args )
	{
		return	this.ps[name]	=await super.loadel( name ,...args )	//addui
	}*/


	/*delpage( name )
	{
		const ui	=this.ps[name]

		if( ui )
		{
			this.divs.delete( ui.el )

			ui.el?.remove()
			ui.css?.remove()
			delete this.ps[name]
		}
	}*/




	newpinv( dholder ,isclpl )
	{
		var p	=dholder.newpinv( this )

		this.addui( p )

		this.ps[ isclpl ? "plinv" : "inv" ]	=p

		this.el.appendChild( p.el )

		return p
	}


	/** Run this for all new ui elements so we can do reverse
	 * lookup from HTML element to our custom ui element;
	 * for example when clicking, or drag&drop. *

	addui( ui )
	{
		this.divs.set( ui.el ,ui )

		return ui
	}*/

	/** Some child elements should reference parent ui to not be confused.
	 * Maybe change later? *

	addel2ui( el ,ui )
	{
		this.uis.set( el ,ui )

		return ui
	}*/



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


	resize()
	{
		this.can.resize()
	}
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