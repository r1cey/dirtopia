export default class HTMLEl
{
	dad

	gobj

	el

	css


	constructor( dad ,el ,gobj ,css )
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

		this.gobj	=gobj

		this.css	=css
	}



	html()	{return this.dad.html()	}



	async loadel( name, gobj ,append =true )
	{
		var dad	=this

		var promis	=[,,]

		promis[0]	=HTMLEl.fetch(`pages/${name}/main.xhtml`)

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
			}
		)
		var res	=await Promise.allSettled( promis )

		var el, css, hel

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
			hel	=new HTMLEl( this ,el ,gobj ,css )
		}
		else
		{
			hel	=new (res[1].value.default)( this, el, gobj, css )
		}
		hel.hide()

		if( append )	this.el.appendChild( el )

		return hel
	}


	///////////////////////////////////////////////////////////////////////////


	hide()	{ this.el.style.display	="none" ;	return this }


	show()	{ this.el.style.display ="" ;	return this }


	///////////////////////////////////////////////////////////////////////////


	static fetch( url )
	{
		return fetch(url, {cache: "no-store"})
	}
}