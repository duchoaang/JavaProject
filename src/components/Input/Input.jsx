import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './Input.module.scss';
import { Link } from 'react-router-dom';
import get from '~/utils/request/get';
import post from '~/utils/request/post';
const cx = classnames.bind(styles);
import SearchIcon from '@mui/icons-material/Search';
const Input = () => {
    const [inputValue, setInputValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [resultsList, setResultsList] = useState([]);

    // useEffect(() => {
    //     get('http://127.0.0.1:5000/api/documents')
           
    //         .then((json) => {
            
    //             const results = json.filter((docs) => {
    //                 return (
    //                     inputValue &&
    //                     docs &&
    //                     docs.title &&
    //                     docs.title.toLowerCase().includes(inputValue.toLowerCase())
    //                 );
    //             });
          
    //             setResultsList(results);
    //         });
    //     if(inputValue.length > 0) {
    //         setShowResult(true);
    //     }

    // }, [inputValue]);
    const handleChangeInput = (value) => {
        setInputValue(value);
        
        
    };

    const handleClickResult = (value) => {
        setShowResult(false);
        setInputValue('');
    };
    return (
        <>
            <div className={cx('search')}>
                <input
                    type="text"
                    placeholder="Tìm kiếm...."
                    style={{ height: '100%' }}
                    value={inputValue}
                    onChange={(e) => handleChangeInput(e.target.value)}
                />
                <div className={cx('search_icon')}>
                <SearchIcon />
                </div>
                <div className={cx('results_list')}>
               {showResult && 
                    resultsList.map((result, id) =>{
                        return <Link className={cx('result')} to={`/Documents/${result.id}`} key={id} 
                            onClick={handleClickResult}
                        >{result.title} </Link>
                    })
             
               
               }
            </div>
            </div>
        </>
    );
};
export default Input;
