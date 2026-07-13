// import Can from "./canvas/Canvas.js"

import Html from "./Html.js"



export default class Interface
{
    game

    html

    con

    can

    fps

    stream



    resize_	=
	{
		toid	:0
		,
		delay	:100
	}


    // divswithoutel   =new Set()



    constructor( game )
    {
        this.game	=game

        if( document.readyState === 'loading' )
		{
    		// If the browser is still parsing, wait for the event

    		document.addEventListener('DOMContentLoaded', this.readhtml. bind(this) )
		}
		else
		{
    		this.readhtml()
		}
    }


    readhtml()
    {
        this.html	=new Html( this.game ,this )

        window.onresize	=this.onresize. bind(this)

        /*for( const div of this.divswithoutel )
        {
            div.readel( this.html )
        }
        this.divswithoutel.clear()*/
    }



    async newlogin( srv )
    {
        const logindiv =await this.html.loaddivgo( "login" ,srv ,true )
        
        logindiv.start()

        return logindiv
    }


    async newplcreate( name ,srv )
    {
        this.html.deldiv('login')

		const div	=await this.html.loaddivgo( 'createpl' ,srv ,true )
		
		div.start( name )

        return div
    }


    async newplinv( pl )
    {
		return await this.html.loaddivgo( "plinv" ,pl )
    }


    clear()
    {   
        const html  =this.html

        html.deldiv( 'login' )
        html.deldiv( 'createpl' )

        html.ks.plinv?.hide()
    }


        
    onresize()
    {
        const res_	=this.resize_

        if( res_.toid )	clearTimeout( res_.toid )
        
        res_.toid	=setTimeout( this.resize, res_.delay )
    }


    #resize()
    {
        this.html.resize()
    }
    resize  =this.#resize. bind(this)
}