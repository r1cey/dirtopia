import V	from './game/shared/Vec.js'

export default class Touch
{
	uie

	bound

	down	=false

	startt	=new V()

	// last	=new V()

	pos	=new V()

	time	=0

	ondown

	onup

	onmove

	onout

	onframe



	constructor(uie ,bound =document )
	{
		this.uie	=uie

		this.bound	=bound

		this.ondown	=this.#ondown.bind(this)

		this.onup	=this.#onup.bind(this)

		this.onmove	=this.#onmove.bind(this)

		this.onout	=this.#onout.bind(this)

		this.onframe	=this.#onframe.bind(this)
	}



	///////////////////////////////////////////////////////////////////////////


	start( isframe =true )
	{
		this.uie.el.addEventListener( "pointerdown" ,this.ondown )
	}

	stop()
	{
		this.uie.el.removeEventListener( "pointerdown" ,this.ondown )
	}


	///////////////////////////////////////////////////////////////////////////



	#ondown( ev )
	{
		var tch	=this

		tch.down	=true

		tch.startt.setev( ev )
		// tch.last.setev( ev )
		tch.pos.setev( ev )

		tch.uie.el.style.pointerEvents	="none"

		var bound	=this.bound

		document.body.classList.add( "dragging" )

		bound.addEventListener("pointerup", tch.onup )
		bound.addEventListener("pointercancel", tch.onout )
		bound.addEventListener("mouseleave" ,tch.onout )
		bound.addEventListener("pointermove", tch.onmove )

		console.log(tch.uie.el.className ,bound )

		// tch.time	=performance.now()

		requestAnimationFrame( this.onframe )

		return tch.stopdefs(ev)
	}

	#onup( ev )
	{
		var tch	=this

		// ev.target.releasePointerCapture( ev.pointerId )

		console.log(ev.target ,tch.bound)

		this.stopdrag()

		/*if(performance.now() - tch.time <= 200)
		{
			tch.uie.clicked?.( tch.pos )
		}*/
	}

	#onmove( ev )
	{
		var tch	=this

		// console.log("move")

		tch.pos.setev( ev )

		return tch.stopdefs(ev)
	}

	#onout( ev )
	{
		var tch	=this

		tch.stopdrag()

		console.log("out")

		tch.uie.el.style.transform	=""
	}


	#onframe( t )
	{
		var tch	=this

		// tch.last.set(tch.pos)

		tch.uie.el.style.transform	=`translate(${tch.pos.x-tch.startt.x}px, ${tch.pos.y-tch.startt.y}px)`

		if( tch.down )
		{
			requestAnimationFrame( this.onframe )
		}
	}


	///////////////////////////////////////////////////////////////////////////



	stopdefs( ev )
	{
		ev?.stopPropagation();
		ev?.preventDefault();
		ev.cancelBubble=true;
		ev.returnValue=false;
		return false;
	}


	stopdrag()
	{
		var tch	=this

		tch.down	=false

		document.body.classList.remove( "dragging" )

		tch.uie.el.style.pointerEvents	=""

		var bound	=tch.bound

		bound.removeEventListener("pointerup", tch.onup )
		bound.removeEventListener("pointercancel", tch.onout )
		bound.removeEventListener("mouseleave" ,tch.onout )
		bound.removeEventListener("pointermove", tch.onmove )
	}
}