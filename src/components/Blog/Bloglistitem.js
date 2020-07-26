import React from 'react';

const Bloglistitem = ({post}) => {

    console.log(post);
    const date = new Date(post.date)
    const regex = /(<([^>]+)>)/ig;
    const result = post.content.rendered.replace(regex, '');

    return(
        <div className="blog_list_item mb_50"  key={post.id}>
           { /*<img className="img-fluid" src={require("../../img/" + post.image)} alt=""/> */ }
            <div className="blog_content">
                { /* <div className="post_date">
                    <h2>{post.dae} <span>{post.Month}</span></h2>
                </div> */ }
                <div className="entry_post_info">
                </div>
                <h5 className="f_p f_size_20 f_500 t_color mb_20">{post.title.rendered}</h5>
                <p className="f_400 mb_20">{result}</p>
                <p>Posted Date: {date.getDate() +  '/' +  date.getMonth() + '/' + date.getFullYear()}</p>
                { /*<a href=".#" className="learn_btn_two">Read More <i className="ti-arrow-right"></i></a>*/ }
            </div>
        </div>
    )
        
}

export default Bloglistitem;