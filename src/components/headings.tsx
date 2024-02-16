interface HeadingsProps {
    title: string;
}
const Headings = ({title}: HeadingsProps) => {
    return ( 
        <h2 className="text-2xl font-bold">
            {title}
        </h2>
     );
}
 
export default Headings;