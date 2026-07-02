


export default class Div
{
	dad

	el

	css


	static DivGo	//can't just import because of circular dependency with DivGameObj


	///////////////////////////////////////////////////////////////////////////



	constructor( dad ,el ,css )
	{
		this.dad	=dad

		if(typeof el === "string" )
		{
			el	=document.createElement( el )
/*
			el.style.display	="none"

			dad.el.appendChild( el )*/
		}
		this.el	=el

		this.css	=css
	}


	///////////////////////////////////////////////////////////////////////////



	html()	{return this.dad.html()	}

	iface()	{return this.html().iface	}


	getgo()
	{
		var ui	=this

		while( ! ui.gobj )
		{
			ui	=ui.dad
		}
		return ui.gobj
	}


	///////////////////////////////////////////////////////////////////////////
	
	
	/** Run this for all new ui elements so we can do reverse
	 * lookup from HTML element to our custom ui element;
	 * for example when clicking, or drag&drop. */

	adddiv( div )
	{
		this.html().divs.set( div.el ,div )

		return div
	}

	adddivn( div ,name )
	{
		const divs	=this.adddiv( div )

		this[name]	=div

		return div
	}


	async loaddivgo( name ,gobj ,append )
	{
		return this.loaddiv( name ,[ gobj ] ,append, Div.DivGo )
	}

	async loaddiv( name, args =[] ,append =true ,Class =Div )
	{
		const dir	="divs"
		
		const rootdir	="iface/"+dir

		const promis	=[,,]

		promis[0]	=Div.fetch(`${rootdir}/${name}/main.xhtml`)

		promis[1]	=import(`./${dir}/${name}/main.js?${Math.floor(Math.random()*100)}`)

		promis[2]	=new Promise(function(res, rej)
			{
				let el	=document.createElement( 'link' )

				el.type	='text/css'
				el.rel	='stylesheet'
				el.onload	=(ev)=> res(el)
				el.onerror	=(ev)=> rej(el)
				el.href	=`${rootdir}/${name}/main.css?${Math.floor(Math.random()*100)}`

				document.head.appendChild(el)
			}
		)
		const res	=await Promise.allSettled( promis )

		var el, css, div

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
			div	=new Class( ...args ,this ,el ,css )
		}
		else
		{
			div	=new (res[1].value.default)( ...args ,this ,el ,css )
		}
		// That's pretty cool that if args is an empty array,
		// then JS will just ignore it completely!

		this.adddivn( div ,name )

		if( append )
		{
			div.hide()
			
			this.el.appendChild( el )
		}
		return div
	}


	hide()	{ this.el.style.display	="none" ;	return this }


	show()	{ this.el.style.display ="" ;	return this }


	///////////////////////////////////////////////////////////////////////////


	/** Get ui of first holder gobj in chain, including itself. */

	gholdui()
	{
		var ui	=this

		while( ui.dad )
		{
			var gobj	=ui.gobj

			if( gobj.isholder )	return ui

			ui	=ui.dad
		}
	}


	///////////////////////////////////////////////////////////////////////////


	static fetch( url )
	{
		return fetch(url, {cache: "no-store"})
	}
}