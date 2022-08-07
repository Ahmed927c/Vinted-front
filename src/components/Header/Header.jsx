import './styles.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InputBase, FormControl, MenuItem, Select } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Range, getTrackBackground } from 'react-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
const Header = ({
    token,
    setUser,
    handleInput,
    priceRange,
    handlePriceRange,
    sort,
    handleSort,
    setLoginModal,
}) => {
    const navigate = useNavigate();
    const [type, setType] = useState('Articles');

    return (
        <header className="header-component ">
            <div className="header__top">
                <FormControl ClassName="form-control">
                    <Select value={type} onChange={e => setType(e.target.value)}>
                        <MenuItem id="MenuItem" value="Articles">
                            Articles
                        </MenuItem>
                        <MenuItem id="MenuItem" value="Membres">
                            Membres
                        </MenuItem>
                        <MenuItem id="MenuItem" value=" Forum" autoFocus>
                            {' '}
                            Forum
                        </MenuItem>
                        <MenuItem value="help">Centre d'aide</MenuItem>
                    </Select>
                </FormControl>

                <Link to={`/`}>
                    <img src={logo} alt="" />
                </Link>

                <div className="filter-search">
                    <InputBase
                        placeholder="Recherche des articles"
                        className="searchbar"
                        onChange={event => handleInput(event)}
                    />
                    <div className="search-icon">
                        <SearchIcon />
                    </div>
                </div>

                <div className="range">
                    <Range
                        step={0.5}
                        min={1}
                        max={500}
                        values={priceRange}
                        onChange={priceRange => handlePriceRange(priceRange)}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: '6px',
                                    width: '100%',
                                    backgroundColor: '#ccc',
                                }}
                            >
                                <div classeName="range-length"
                                    ref={props.ref}
                                    style={{
                                        height: '5px',
                                        width: '100%',
                                        borderRadius: '4px',
                                        background: getTrackBackground({
                                            colors: ['#ccc', '#09adb6', '#ccc'],
                                            min: 1,
                                            max: 500,
                                            values: priceRange,
                                        }),
                                        alignSelf: 'center',
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ index, props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '12px',
                                    width: '12px',
                                    borderRadius: '25px',
                                    backgroundColor: '#09adb6',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-32px',
                                        color: 'white',
                                        backgroundColor: '#09adb6',
                                        padding: '5px 6px',
                                        borderRadius: '5px',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                    }}
                                >
                                    {priceRange[index]}€
                                </div>
                            </div>
                        )}
                    />
                </div>

                <div className="sort">
                    Trier par prix:
                    <div className="toggle">
                        <button className="switch"></button>
                        <button
                            onClick={handleSort}
                            className={sort === 'asc' ? 'slider asc' : 'slider'}
                        >
                            {sort === 'asc' ? (
                                <FontAwesomeIcon icon={faArrowDown} />
                            ) : (
                                <FontAwesomeIcon icon={faArrowUp} />
                            )}
                        </button>
                    </div>
                </div>

                {token === null ? (
                    <div className="btn-container">
                        <Link
                            classeName="btn"
                            to="/signup"
                        >
                            S'inscrire
                        </Link>
                        <Link
                            classeName="btn-login"
                            to="/login"
                            onClick={() => {
                                setLoginModal(true);
                                document.body.style.overflow = 'hidden';
                            }}
                        >
                            Se connecter
                        </Link>
                        <Link to={'/publish'}>
                              Vends tes articles
                        </Link>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            setUser(null);
                            navigate('/');
                        }}
                    >
                        Se déconnecter
                    </button>
                )}

                <br />
            </div>
        </header>
    );
};

export default Header;

// import {AppBar, Toolbar, Typography, Box, InputBase,} from '@material-ui/core';";
// import logo from '../../assets/logo.png';
// import  SearchIcon  from '@material-ui/icons/Search';

// import useStyles from './styles';
// const Header = () => {
//   const classes = useStyles();
//     return (
//         <AppBar position="static">

//             <Toolbar className={classes.toolbar}>

//                 <Box display="flex">
//                     <Image className={classes.avatar} width={300} height={300}>
//                         <img src={logo} alt="logo" />
//                     </Image>
//                     <Typography variant="h6" className={classes.title}>
//                         Vinted
//                     </Typography>
//                      {/* <Autocomplete>  */}
//                         <div className={classes.search}>
//                             <div className={classes.searchIcon}>
//                                 <SearchIcon />
//                             </div>

//                             <InputBase
//                                 placeholder="Search..."
//                                 classes={{
//                                     root: classes.inputRoot,
//                                     input: classes.inputInput,
//                                 }}
//                             />
//                         </div>
//                      {/* </Autocomplete> */}
//                 </Box>
//                 </Toolbar>
//         </AppBar>

//     );
// };

// export default Header;
