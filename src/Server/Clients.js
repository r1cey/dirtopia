import Cl	from './Client.js'


/** Manages the collection of connected clients. */

export default class Clients
{
	srv

	o	={}



	g( n)	{return this.o[n] }

	s( n ,cl)	{ this.o[n] =cl }



	constructor( srv)
	{
		this.srv	=srv
	}


	///////////////////////////////////////////////////////////////////////////


	/** Add new clients here.
	 * @return {Cl} The newly created client instance.*/

	new( ws ,pl)
	{
		const cl	=new Cl( ws, pl, this.srv )

		this.o[pl.name]	=cl

		return cl
	}



	del( n)
	{
		delete this.o[n]
	}
}