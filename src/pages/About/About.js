import './About.scss';

import Typography from '../../components/Typography/Typography';
import Box from '../../components/Box/Box';
import React from 'react';

export default function About() {
  return (
    <React.Fragment>
      <header className="header">
        
        <div className='header__textbox'>
          <Typography elevation={1} fontWeight={700} variant="h1">About Us</Typography>
        </div>

        <div className="header__composition">
          <div className="composition">
            <img src="/assets/comp-1.jpg" alt="Composition 1" className="composition__photo composition__photo--comp1" />
            <img src="/assets/comp-2.jpg" alt="Composition 2" className="composition__photo composition__photo--comp2" />
            <img src="/assets/comp-3.jpg" alt="Composition 3" className="composition__photo composition__photo--comp3" />
          </div>

        </div>
      </header>

      <main>
        <section className="section-intro">
          <div className="u-center-text">
            <Typography elevation={1} fontWeight={700} variant="h2">Learn more about this project</Typography>
          </div>
          
          <div className="intro-text">
            <Typography fontWeight={700} variant="h4">Lorem</Typography>
            <Typography fontWeight={300}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta pretium accumsan. Nullam non efficitur elit, at lobortis massa. Maecenas ornare dignissim auctor. Ut eleifend nulla sit amet laoreet euismod. Donec in elit ac neque efficitur placerat. Cras ac mi tellus. Quisque purus eros, accumsan sit amet nunc sit amet, dignissim gravida velit. Praesent nisi felis, sollicitudin vitae sem non, gravida mattis lorem. Suspendisse augue quam, feugiat eu congue sit amet, dignissim quis ex. 
            </Typography>
          </div>

          <div className="intro-text">
            <Typography fontWeight={700} variant="h4">Ipsum</Typography>
            <Typography fontWeight={300}>
              Nam et risus eu turpis feugiat vehicula. Nulla vel ligula ante. Vivamus luctus, arcu ac maximus gravida, nunc erat semper dolor, id vehicula metus sapien mattis nisi. Mauris molestie vestibulum quam, in pharetra nunc luctus ac. Nullam imperdiet consectetur ipsum, eu ultrices ante sagittis a. Maecenas venenatis ultrices tincidunt. Nulla sagittis ultricies leo, in feugiat sapien lobortis eu. Nulla vitae nunc non mi maximus pretium. Morbi consectetur sagittis sapien, ut lobortis tortor elementum ut.
            </Typography>
          </div>
        </section>

        <div className="section-cards">

        </div>
      </main>
    </React.Fragment>
  )
}