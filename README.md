# fork-pagination-react
Ветка пагинации из викирипа, со всеми редаксами, редьюсерами и апишками

components
	/common
		/Paginator
			/Paginator.jsx // при клике возвращается коллбэк onPageChanged, который помещается в пропсах  и экспортируется внизу, прилетает в Users.jsx...

	/Users
		/User.jsx // распечатывается каждый блок юзера, с картинкой и описанием...
		/Users.jsx // подключен к пагинатору, получает коллбэк onPageChanged
		/UsersContainer.jsx

	/Users
		/Users.jsx
		
		