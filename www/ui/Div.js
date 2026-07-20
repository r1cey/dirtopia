


export default class Div
{
	dad

	el

	css

	/** Basically atm I'm only using it when adding to html root.
	 * Maybe change later?	 */

	name


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

	ui()	{return this.html().ui	}


	getgo()
	{
		var ui	=this

		while( ! ui.gobj )
		{
			ui	=ui.dad
		}
		return ui.gobj
	}


	getname()	{return this.name ?? this.elname() }

	gname	=this.getname


	///////////////////////////////////////////////////////////////////////////
	
	
	/** Run this for all new ui elements so we can do reverse
	 * lookup from HTML element to our custom ui element;
	 * for example when clicking, or drag&drop. */

	adddiv( div ,html =this.html() )
	{
		html.alldivs.set( div.el ,div )

		return div
	}


	async loaddivgo( name ,gobj ,args =[] ,append ,adddiv )
	{
		return this.loaddiv( name ,[ gobj ,...args ] ,append ,adddiv )
	}

	async loaddiv( name, args ,append =true ,adddiv =true )
	{
		const dir	="divs"
		
		const rootdir	="ui/"+dir

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
			console.error(`Failed to load class: ${name}/main.js`)
		}
		else
		{
			div	=new (res[1].value.default)( ...args ,this ,el ,css )
		}
		// That's pretty cool that if args is an empty array,
		// then JS will just ignore it completely!

		if( ! div )	return

		if( adddiv )	this.adddiv( div )

		if( append )
		{
			div.hide()
			
			this.el.appendChild( div.el )
		}
		return div
	}



	hide()	{ this.el.style.display	="none" ;	return this }


	show()	{ this.el.style.display ="" ;	return this }



	elname()
	{
		return this.el.localName
	}


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


	static async loaddiv( name, args =[] ,append =true )
	{
		

		return div
	}



	static fetch( url )
	{
		return fetch(url, {cache: "no-store"})
	}
}