import GridEl from "./GridEl.js"


export default class GridItem	extends GridEl
{
	t 	=new Touch( this)


	constructor( gobj )
	{
		super( gobj )

		this.el.onmousedown	=this.t.ondown.bind( this )

		this.el.onmouseup	=( ev )=>
		{
			this.t.down	=false
		}
		this.el.onclick	=( ev )=>
		{
			this.gcl().html.newctxm( this ,ev )
		}
	}


	movmod()
	{
		console.log("AAA")
	}
}



class Touch
{
	down	=false


	ondown( ev )
	{
		this.t.down	=true

		
	}


	onclick( ev )
	{
		this.t.down	=false

	}
}