import V	from '../../shared/Vec.js'

export default class Touch
{
	can

	// drag	=new Drag(this)

	on	=false

	start	=new V()

	last	=new V()

	pos	=new V()

	time	=0

	ondown	=this.#ondown. bind(this)
	onup	=this.#onup. bind(this)
	onmove	=this.#onmove. bind(this)



	constructor(can)
	{
		this.can	=can
	}



	onframe()
	{
		var tch	=this
		
		tch.last.set(tch.pos)
	}


	////////////////////////////////////////////////////////////////////////// 



	#ondown( ev )
	{
		const tch	=this

		tch.on	=true

		tch.start.setev( ev )
		tch.last.setev( ev )
		tch.pos.setev( ev )

		const el	=tch.can.el

		el.addEventListener( 'pointerup' ,this.onup )
		// el.onpointercancel	=this.onpup. bind(this)
		el.addEventListener( 'pointerout', this.onup )		
		el.addEventListener( 'pointermove', this.onmove )

		tch.time	=performance.now()

		return tch.stopslct(ev)
	}


	#onup( ev )
	{
		const tch	=this

		tch.on	=false

		const el	=tch.can.el

		el.removeEventListener( 'pointermove', this.onmove )
		el.removeEventListener( 'pointerup', this.onup )
		el.removeEventListener( 'pointerout', this.onup )

		if(performance.now() - tch.time <= 200)
		{
			tch.can.clicked( tch.pos )
		}
	}


	#onmove( ev )
	{
		const tch	=this

		// console.log(tch.pos)

		tch.pos.setev( ev )

		return tch.stopslct(ev)
	}


	///////////////////////////////////////////////////////////////////////////



	stopslct( ev )
	{
		// if(ev.stopPropagation) ev.stopPropagation();
		if(ev.preventDefault) ev.preventDefault();
		// ev.cancelBubble=true;
		// ev.returnValue=false;
		// return false;
	}
}
