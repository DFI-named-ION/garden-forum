import { Link } from 'react-router-dom';

export const NavBar = () => (
    <nav className='navbar navbar-dark bg-success navbar-expand-md'>
        <div className='container'>
            <Link to='/' className='navbar-brand text-dark'>Garden - Forum</Link>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav mr-auto'>
                    <li className='navbar-item'>
                        <Link to='/students' className='nav-link'>About</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)