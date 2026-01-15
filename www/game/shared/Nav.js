export default class Nav
{
	a


	g( i )	{return this.a[i] }
	

	setpath( path ,game )
	{
		var liveo

		switch( path[0] )
		{
			case "maps"	:
				
				liveo	=game.maps
			break
			case "pls"	:
				
				liveo	=game.pls
			break
		}
		for(var i =1,len =path.length ;i<len;i++)
		{
			liveo	=liveo.newliveo( path ,i )
		}
	}

	add( path ,_i )
	{
		this.a.push( this.exl("getnavo"))
	}

	last()	{return this.a.at(-1) }

	dad( i )	{return this.a[i-1] }


	additem( item )
	{
		var i	=this.a.length - 1

		this.a[i].additem( item ,this ,i )
	}

	dadl()	{return this.a.at(-2) }

	ex( i ,fn ,...args)
	{
		this.a[i][fn]( this ,i ,...args )
	}

	exdad( i ,fn ,...args ){	this.ex( i-1 ,fn ,...args )}

	exl( fn ,...args ){	this.ex( this.a.length-1 ,fn ,...args )}

	exdadl( fn, ...args ){	this.ex( this.a.length-2 ,fn ,...args )}
}