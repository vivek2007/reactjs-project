import React,{ useState,useEffect } from 'react';
//import Blogrightsidebar from './Blogrightsidebar';
import Bloglistitem from './Bloglistitem';


const Bloglists =()=>{

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function loadPosts() {
            const response = await fetch('http://fullstackdevpro.work/wordpress-api/wp-json/wp/v2/posts');
            if(!response.ok) {
                // oups! something went wrong
                return;
            }
    
            const posts = await response.json();
            setPosts(posts);
        }
    
        loadPosts();
   }, [])

    return(
        <section className="blog_area sec_pad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                     
                    {posts.map((post, index) => (
                      <Bloglistitem post={post} key={index} />
                    ))}
                        
                        
                        {/* <ul className="list-unstyled page-numbers shop_page_number text-left mt_30">
                            <li><span aria-current="page" className="page-numbers current">1</span></li>
                            <li><a className="page-numbers" href=".#">2</a></li>
                            <li><a className="next page-numbers" href=".#"><i className="ti-arrow-right"></i></a></li>
                        </ul> */}

                    </div>

                    {/*
                        <div className="col-lg-4">
                             <Blogrightsidebar ServiceData={ServiceData}/> 
                        </div>
                    */
                    }
                </div>
            </div>
        </section>
    )
}
export default Bloglists;