export default class UiEl
{
	dad

	el

	css


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

		if( ! this.constructor.ishtml )
		{
			this.html().addui( this )
		}
		this.css	=css
	}


	///////////////////////////////////////////////////////////////////////////



	html()	{return this.dad.html()	}



	///////////////////////////////////////////////////////////////////////////


	async loadel( name, dir ="pages" ,args =[] ,append =true )
	{
		const promis	=[,,]

		promis[0]	=UiEl.fetch(`${dir}/${name}/main.xhtml`)

		promis[1]	=import(`./${dir}/${name}/main.js?${Math.floor(Math.random()*100)}`)

		promis[2]	=new Promise(function(res, rej)
			{
				let el	=document.createElement( 'link' )

				el.type	='text/css'
				el.rel	='stylesheet'
				el.onload	=(ev)=> res(el)
				el.onerror	=(ev)=> rej(el)
				el.href	=`pages/${name}/main.css?${Math.floor(Math.random()*100)}`

				document.head.appendChild(el)
			}
		)
		const res	=await Promise.allSettled( promis )

		var el, css, ui

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
			ui	=new this.constructor( ...args ,this ,el ,css )
		}
		else
		{
			ui	=new (res[1].value.default)( ...args ,this ,el ,css )
		}
		ui.hide()

		if( append )	this.el.appendChild( el )

		return ui
	}


	hide()	{ this.el.style.display	="none" ;	return this }


	show()	{ this.el.style.display ="" ;	return this }


	///////////////////////////////////////////////////////////////////////////


	/** Get ui of first holder gobj in chain, including itself. */

	gholdui()
	{
		var ui	=this

		while( ! ui.constructor.ishtml )
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