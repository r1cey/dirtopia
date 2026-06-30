export default( Base )=>class Live extends Base
{
	dad

	_this


	constructor( obj ,dad )
	{
		this.dad	=dad

		this._this	=obj
	}



	canchildadditem( child ,item ,len )	{return len }
}