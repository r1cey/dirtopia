export default( Base )=>class Soft	extends Base
{
	canadditem( item ,len ,nav )
	{
		len	=Math.min( super.canadditem( item ,len ,nav ), len )

		if( nav.at(-2).canchildadd )
		{
			return Math.min(
				
				nav.at(-2).canchildadd( item ,canlen ,nav ,nav.length - 2 )
				,
				len
			)
		}
		return len
	}


	calcvol()	{return this.vol() + this.itemvol() }
}