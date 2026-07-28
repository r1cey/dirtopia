export default( Base )=>class Soft	extends Base
{
	canadditem( item ,len ,nav )
	{
		// len	=super.canadditem( item ,len ,nav )

		// if( len <= 0 || !len )	return 0

		// if( nav.at(-2).canchildadd )
		{
			return Math.min(

				super.canadditem( item ,len ,nav )
				,
				nav.at(-2).canchildadd?.( item ,len ,nav ,nav.length - 2 ) ?? Infinity
			)
		}
		// return len
	}


	calcvol()	{return this.vol() + this.itemvol() }
}