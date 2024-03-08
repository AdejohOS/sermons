interface HeadingsProps {
  title?: string;
  description?: string;
}
const Headings = ({ title, description }: HeadingsProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Headings;
