export default class Pls
{
	o	={}

	// arr	=[]

	game


	constructor( game )
	{
		this.game	=game
	}


	g( n )	{return this.o[n] }

	s( pl )	{return this.o[pl.name]	=pl }


	msg2navo( afrom ,i ,ato )	{ ato.push( this.o[afrom[i]] )}
}