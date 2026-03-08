import V	from './game/shared/Vec.js'

export default class Touch
{
	uie

	bound

	down	=false

	start	=new V()

	// last	=new V()

	pos	=new V()

	time	=0

	ondown

	onup

	onmove

	onout

	onframe



	constructor(uie ,bound =document.body )
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

		tch.start.setev( ev )
		// tch.last.setev( ev )
		tch.pos.setev( ev )

		tch.uie.el.classList.add( "drag" )

		var bound	=this.bound

		bound.addEventListener("pointerup", tch.onup )
		bound.addEventListener("pointerout", tch.onout )
		bound.addEventListener("pointermove", tch.onmove )

		// tch.time	=performance.now()

		requestAnimationFrame( this.onframe )

		return tch.stopdefs(ev)
	}

	#onup( ev )
	{
		var tch	=this

		// ev.target.releasePointerCapture( ev.pointerId )

		console.log(ev.target)

		this.stopdrag()

		/*if(performance.now() - tch.time <= 200)
		{
			tch.uie.clicked?.( tch.pos )
		}*/
	}

	#onmove( ev )
	{
		var tch	=this

		// console.log(tch.pos)

		tch.pos.setev( ev )

		return tch.stopdefs(ev)
	}

	#onout( ev )
	{
		var tch	=this

		tch.stopdrag()

		tch.uie.el.style.transform	=""
	}


	#onframe( t )
	{
		var tch	=this

		// tch.last.set(tch.pos)

		tch.uie.el.style.transform	=`translate(${tch.pos.x-tch.start.x}px, ${tch.pos.y-tch.start.y}px)`

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

		tch.uie.el.classList.remove( "drag" )

		var bound	=tch.bound

		bound.removeEventListener("pointerup", tch.onup )
		bound.removeEventListener("pointerout", tch.onout )
		bound.removeEventListener("pointermove", tch.onmove )
	}
}