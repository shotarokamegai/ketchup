import AnimatedPage from './AnimatedPage';

export default function Content({ children }) {
  return (
    <AnimatedPage>
    <div className="container">
      { children }
    </div>
    </AnimatedPage>
  )
}