import DivGo from "../../DivGameObj.js"


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
}

Login.prototype. start	=function()
{
	const srv	=this.gobj

	this.elbut.onclick	=( ev )=>
	{
		const elinp	=this.el.querySelector('input')

		ev.currentTarget.disabled	=true

		srv.sendlogin({ name: elinp.value })

		return false
	}
	// this.show()

	// document.body.insertBefore( this.el, document.body.firstChild )
}

Login.prototype. reset	=function()
{
	this.elbut.disabled	=false
}