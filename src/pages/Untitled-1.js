 {/*   <CommentsBlock
  
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]} 
        {
          (isLoading?[...Array(5)]: comment.items).map((obj, index)=>(
            isLoading?(<CommentsBlock key={index}/>

            ):(
              <CommentsBlock
              key = {obj._id}
              _id={obj._id}
              text= {obj.text}
              user={obj.authorId}
              ></CommentsBlock>
            )
          ))
        } 
        isLoading={false}
      >
        <Index />
      </CommentsBlock> */}