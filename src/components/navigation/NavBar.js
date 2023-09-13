import { Link } from 'react-router-dom';

export const NavBar = () => (
    <>
        <nav class="navbar navbar-expand-lg bg-success navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Garden Forum</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#hidden" aria-controls="hidden" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="hidden">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className='nav-item'>
                            <Link to='/about' className='nav-link active'>Про сайт</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/wiki' className='nav-link active'>Вікі</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/receipts' className='nav-link active'>Рецепти</Link>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-dark" type="submit">Search</button>
                    </form>
                    <div className='mx-3 me-0 d-flex'>
                        <button class="btn btn-outline-warning">Login</button>
                        <button class="btn btn-outline-warning">Register</button>
                    </div>
                </div>
            </div>
        </nav>
    </>
)