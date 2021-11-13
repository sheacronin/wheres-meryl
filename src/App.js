import './App.css';
import WheresMerylImage from './components/WheresMerylImage';
// eslint-disable-next-line no-unused-vars
import app from './firebaseInit';
import wheresMeryl1 from './img/wheres-meryl-1.jpg';

function App() {
    return (
        <div>
            <header>
                <h1>Where's Meryl?</h1>
                <p>
                    Scroll around this image of Greece to find Donna and the
                    Dynamos from hit film Mamma Mia!
                </p>
            </header>
            <WheresMerylImage imageSrc={wheresMeryl1} />
        </div>
    );
}

export default App;
