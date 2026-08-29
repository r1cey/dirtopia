import DivGo from "../../DivGameObj.js"


/** Is the login div.
 * GameObj that it's attached to is the server. */

export default class Login extends DivGo
{
	get elbut()
	{	
		return this.el.querySelector('button')
	}



	constructor( ...args )
	{
		super( ...args )

		this.start()
	}



	start()
	{
		const srv	=this.gobj

		this.elbut.onclick	=( ev )=>
		{
			const elinp	=this.el.querySelector( 'input')

			ev.currentTarget.disabled	=true

			srv.sendlogin( { name :elinp.value})

			return false
		}
		// this.show()

		// document.body.insertBefore( this.el, document.body.firstChild )
	}



	reset()
	{
		this.elbut.disabled	=false
	}
}