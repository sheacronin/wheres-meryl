import './App.css';
import WheresMerylImage from './components/WheresMerylImage';
import app from './firebaseInit';
import wheresMeryl1 from './img/wheres-meryl-1.jpg';

function App() {
    return (
        <div>
            Hello world
            <WheresMerylImage imageSrc={wheresMeryl1} />
        </div>
    );
}

export default App;
