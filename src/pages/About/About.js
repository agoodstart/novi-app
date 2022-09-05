import './About.scss';

import Typography from '../../components/Typography/Typography';
import Box from '../../components/Box/Box';
import React from 'react';
import Button from '../../components/Button/Button';

import useTheme from '../../hooks/useTheme';

export default function About() {
  const { colors } = useTheme();

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

      <main className="main-about">
        <section className="section-intro">
          <div className="u-center-text">
            <Typography elevation={1} fontWeight={700} variant="h2">Learn more about this project</Typography>
          </div>
          
          <div className="u-margin-top-small">
            <Typography fontWeight={700} variant="h4">Lorem</Typography>
            <Typography fontWeight={300}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta pretium accumsan. Nullam non efficitur elit, at lobortis massa. Maecenas ornare dignissim auctor. Ut eleifend nulla sit amet laoreet euismod. Donec in elit ac neque efficitur placerat. Cras ac mi tellus. Quisque purus eros, accumsan sit amet nunc sit amet, dignissim gravida velit. Praesent nisi felis, sollicitudin vitae sem non, gravida mattis lorem. Suspendisse augue quam, feugiat eu congue sit amet, dignissim quis ex. 
            </Typography>
          </div>

          <div className="u-margin-top-small">
            <Typography fontWeight={700} variant="h4">Ipsum</Typography>
            <Typography fontWeight={300}>
              Nam et risus eu turpis feugiat vehicula. Nulla vel ligula ante. Vivamus luctus, arcu ac maximus gravida, nunc erat semper dolor, id vehicula metus sapien mattis nisi. Mauris molestie vestibulum quam, in pharetra nunc luctus ac. Nullam imperdiet consectetur ipsum, eu ultrices ante sagittis a. Maecenas venenatis ultrices tincidunt. Nulla sagittis ultricies leo, in feugiat sapien lobortis eu. Nulla vitae nunc non mi maximus pretium. Morbi consectetur sagittis sapien, ut lobortis tortor elementum ut.
            </Typography>
          </div>
        </section>

        <section className="section-boxes">
          <div className="u-center-text u-margin-top-large">
            <Typography elevation={1} fontWeight={700} variant="h2">We would love to hear from you</Typography>
            <br></br>
            <Typography elevation={1} variant="h3">Ready to answer all your questions</Typography>
          </div>

          <div className="boxes u-margin-top-medium">

            <div className="box">
              <Typography variant="h4">Contact a specialist</Typography>
              <Typography fontWeight={300}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi aut explicabo dolorum eos suscipit qui minus doloribus</Typography>
              <Button color={colors.background.primary.main} fullWidth customStyles={{ borderRadius: '3px'}}>Talk to us</Button>
            </div>

            <div className="box">
              <Typography variant="h4">Get support</Typography>
              <Typography fontWeight={300}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi aut explicabo dolorum eos suscipit qui minus doloribus</Typography>
              <Button color={colors.background.primary.main} fullWidth customStyles={{ borderRadius: '3px'}}>Get Support</Button>
            </div>

            <div className="box">
              <Typography variant="h4">Contact a specialist</Typography>
              <Typography fontWeight={300}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi aut explicabo dolorum eos suscipit qui minus doloribus</Typography>
              <Button color={colors.background.primary.main} fullWidth customStyles={{ borderRadius: '3px'}}>Talk to us</Button>
            </div>

            <div className="box">
              <Typography variant="h4">Get support</Typography>
              <Typography fontWeight={300}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi aut explicabo dolorum eos suscipit qui minus doloribus</Typography>
              <Button color={colors.background.primary.main} fullWidth customStyles={{ borderRadius: '3px'}}>Get Support</Button>
            </div>

          </div>
        </section>

        <section className="section-story">
          <div className="story-text">
            <div className="u-center-text">
              <Typography elevation={1} fontWeight={700} variant="h2">Our Story</Typography>
            </div>
            
            <div className="u-margin-top-small">
              <Typography fontWeight={700} variant="h4">Lorem</Typography>
              <Typography fontWeight={300}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta pretium accumsan. Nullam non efficitur elit, at lobortis massa. Maecenas ornare dignissim auctor. Ut eleifend nulla sit amet laoreet euismod. Donec in elit ac neque efficitur placerat. Cras ac mi tellus. Quisque purus eros, accumsan sit amet nunc sit amet, dignissim gravida velit. Praesent nisi felis, sollicitudin vitae sem non, gravida mattis lorem. Suspendisse augue quam, feugiat eu congue sit amet, dignissim quis ex. 
              </Typography>
            </div>

            {/* <div className="u-margin-top-small">
              <Typography fontWeight={300}>
                Nam et risus eu turpis feugiat vehicula. Nulla vel ligula ante. Vivamus luctus, arcu ac maximus gravida, nunc erat semper dolor, id vehicula metus sapien mattis nisi. Mauris molestie vestibulum quam, in pharetra nunc luctus ac. Nullam imperdiet consectetur ipsum, eu ultrices ante sagittis a. Maecenas venenatis ultrices tincidunt. Nulla sagittis ultricies leo, in feugiat sapien lobortis eu.
              </Typography>
            </div> */}
          </div>

          <div className="story-composition u-margin-top-medium">
            <img src="/assets/road.jpg" alt="Composition 3" className="story-composition__photo" />
          </div>

          <div className="story-text">
            <div className="u-margin-top-medium">
              <Typography fontWeight={300}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta pretium accumsan. Nullam non efficitur elit, at lobortis massa. Maecenas ornare dignissim auctor. Ut eleifend nulla sit amet laoreet euismod. Donec in elit ac neque efficitur placerat. Cras ac mi tellus. Quisque purus eros, accumsan sit amet nunc sit amet, dignissim gravida velit. Praesent nisi felis, sollicitudin vitae sem non, gravida mattis lorem. Suspendisse augue quam, feugiat eu congue sit amet, dignissim quis ex. 
              </Typography>
            </div>

            <div className="u-margin-top-small">
              <Typography fontWeight={300}>
              Vivamus fermentum mi nisi, et sollicitudin ante hendrerit in. Donec mollis sapien sed eleifend vestibulum. Nullam eu nisi ultricies, mollis libero nec, convallis ante. Aenean auctor at mauris in tincidunt. Sed dignissim, nisl at imperdiet consectetur, nibh ligula dignissim nulla, sit amet vulputate justo libero vitae justo. Morbi venenatis scelerisque ornare. Aenean consequat eu ante vel tempor.
              </Typography>
            </div>
          </div>
        </section>

        <section className="section-cards">
          <div className="u-center-text u-margin-top-medium">
              <Typography elevation={1} fontWeight={700} variant="h2">Our Story</Typography>
          </div>
        </section>
      </main>
    </React.Fragment>
  )
}